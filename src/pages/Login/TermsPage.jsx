import React from 'react';
import './TermsPage.css';

const TermsPage = () => {
    return (
        <div className='terms-page'>
            <h1>Terms of Use</h1>
            <section>
                <h2>1. Introduction</h2>
                <p>Welcome to <strong>Merdul's Chat App</strong> ("the App"). By accessing or using the App, you agree to be bound by these Terms of Use. If you do not agree with these terms, please do not use the App.</p>
            </section>
            <section>
                <h2>2. Use of the App</h2>
                <p>This App is a project developed as part of a college assignment and is intended for educational purposes only. By using this App, you agree that your use is at your own risk and that the App is provided on an "as is" and "as available" basis.</p>
            </section>
            <section>
                <h2>3. User Conduct</h2>
                <p>You agree to use the App in compliance with all applicable laws and regulations. You may not:</p>
                <ul>
                    <li>Use the App for any unlawful or fraudulent purposes.</li>
                    <li>Attempt to gain unauthorized access to any part of the App.</li>
                    <li>Disrupt the normal operation of the App.</li>
                </ul>
            </section>
            <section>
                <h2>4. Intellectual Property</h2>
                <p>All content within the App, including text, graphics, logos, and software, is the intellectual property of <strong>Merdul Sharma</strong> or its licensors. You may not reproduce, distribute, or create derivative works from any content without explicit permission.</p>
            </section>
            <section>
                <h2>5. Limitation of Liability</h2>
                <p>As this App is a college project, <strong>Merdul Sharma</strong> will not be liable for any damages or losses arising from the use or inability to use the App, including but not limited to indirect, incidental, or consequential damages.</p>
            </section>
            <section>
                <h2>6. Changes to the Terms</h2>
                <p><strong>Merdul Sharma</strong> reserves the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting on the App. Your continued use of the App after changes are posted constitutes your acceptance of the new terms.</p>
            </section>
            <section>
                <h2>7. Governing Law</h2>
                <p>These Terms of Use shall be governed by and construed in accordance with the laws of <strong>India</strong>, without regard to its conflict of law principles.</p>
            </section>
            <section>
                <h2>8. Contact Information</h2>
                <p>For any questions regarding these Terms of Use, please contact <strong>merdulsharma2003@gmail.com</strong>.</p>
            </section>
        </div>
    );
}

export default TermsPage;
