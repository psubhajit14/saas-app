
import { APICallError, generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {

    const { Class, board, subject } = await req.json();
    if (Class == '' || Class == null || board == null || subject == null || board == '' || subject == '') {
        return Response.json({
            success: false,
            message: "promt parameter not given properly"
        }, {
            status: 500
        })
    }
    try {
        const { object: questions } = await generateObject({
            model: openai('gpt-3.5-turbo'),
            maxTokens: 300,
            system: 'You are a question genration app and you will generate MCQ type questions for students according to their class, board and subject.',
            prompt: `give me 2 MCQ question and answer for students of class ${Class} and ${board} board for ${subject}`,
            schema: z.object({
                questions: z.array(
                    z.object({
                        question: z.string().describe('MCQ question'),
                        options: z.array(z.string().describe('in format options number a,b,c,d along with value')).max(4),
                        answer: z.string().describe("answer only a,b,c,d value not required"),
                        reason: z.string()
                    }),
                ),
            }),
        });
        return Response.json({
            success: true,
            message: {
                questions
            }
        }, {
            status: 200
        })
    } catch (error) {
        if (error instanceof APICallError) {
            return Response.json({
                success: false,
                message: error.toJSON()
            }, { status: 500 })
        } else {
            console.log("Unexpected Error Occurred:", error);
            return Response.json({
                success: false,
                message: "Unexpected Error Occurred on AI" + (error as Error).toString()
            }, { status: 500 })
        }
    }
}