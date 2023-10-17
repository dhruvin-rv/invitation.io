import Head from 'next/head'
import React from 'react'

const PrivacyPolicy = () => {
    return (
        <div className='container_main' style={{margin:"20px auto"}}>
            <Head>
                <meta charSet='UTF-8'/>
                <meta name="author" content="Invitation.io"></meta>
                <meta property="og:title" content="Privacy Policy - Invitation.io" key="title" />
                <meta name="description" content="Privacy Policy for Invitation.io Last Updated on 17/10/2023"></meta>
                <meta name="robots" content="index, follow"></meta>
                <title>Privacy Policy - Invitation.io</title>
            </Head>
            <h1>Privacy Policy</h1>
            <p>Last updated: 17/10/2023</p>
            <p>At Invitation.io, we are committed to protecting your privacy and the security of your personal information. This Privacy Policy explains how we collect, use, and protect your data when you use our website.</p>
            <h2>Information We Collect</h2>
            <p>We collect the following information when you use our Service:</p>
            <ul>
                <li>Your email address, which is provided through our contact form for the purpose of responding to inquiries and providing customer support.</li>
            </ul>
            <h2>Use of Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul>
                <li>To respond to inquiries and provide customer support.</li>
            </ul>
            <h2>Data Security</h2>
            <p>We take data security seriously and implement industry-standard security measures to protect your information. However, please be aware that no method of transmission over the internet or electronic storage is entirely secure, and we cannot guarantee absolute security.</p>
            <h2>Cookies</h2>
            <p>We do not use cookies or tracking technologies on our website.</p>
            <h2>User-Uploaded Content</h2>
            <p>Users can upload PDF files for editing within the Service. We do not store or retain any user-uploaded content on our servers. User-uploaded content remains entirely offline and is not accessible to us. We do not collect or store any information from the content you upload.</p>
            <h2>Changes to this Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be effective immediately upon posting. It is your responsibility to review this Privacy Policy periodically for changes.</p>
            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info.luxecards@gmail.com">info.luxecards@gmail.com</a></p></div>
    )
}

export default PrivacyPolicy