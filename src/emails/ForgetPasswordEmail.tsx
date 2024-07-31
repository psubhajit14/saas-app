import * as React from 'react'
import { Html, Button, Head, Font, Preview, Heading, Row, Section, Text, Link } from '@react-email/components'

interface ForgetPasswordEmailProps {
    username: string;
    token: string;
}

export default function ForgetPasswordEmailTemplate({ username, token }: ForgetPasswordEmailProps) {
    return (
        <Html lang='en' dir='ltr'>
            <Head>
                <title>Forget Password</title>
                <Font
                    fontFamily='Roboto'
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
                        format: 'woff2'
                    }}
                    fontWeight={400}
                    fontStyle='normal'
                />
            </Head>
            <Preview>Please click to Reset Password</Preview>
            <Section>
                <Row>
                    <Text>Hello {username},</Text>
                </Row>
                <Row>
                    <Text>
                        Please use the following link to Reset Password
                    </Text>
                </Row>
                <Row>
                    <Link>{process.env.BASE_URL + '/reset-password?token=' + token + '&username=' + username}</Link>
                </Row>
                <Row>
                    <Text>If you did not request this code, please ignore this email.</Text>
                </Row>

            </Section>
            {/* TODO: you can place button directly */}
            <Section className="text-center my-[32px]">
                <Button href={process.env.BASE_URL + '/api/forget-password?token=' + token}
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                >Reset Password</Button>
            </Section>
        </Html>
    )
}