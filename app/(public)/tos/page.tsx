const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">Terms of service</h1>

      <div className="space-y-6">
        {/* Section 1 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700">
            By accessing or using the SimpleRSS website (the “Website”), you
            agree to comply with and be bound by these Terms of service.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">2. Use of the Website</h2>
          <p className="text-gray-700">
            You are allowed to use the Website for personal, non-commercial
            purposes only. Any unauthorized use of the Website, such as for
            illegal activities or harmful interference, is strictly prohibited.
          </p>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">3. User Accounts</h2>
          <p className="text-gray-700">
            When creating an account, you agree to provide accurate and
            up-to-date information. You are responsible for safeguarding your
            account credentials and any activity performed under your account.
            SimpleRSS reserves the right to suspend or terminate your account if
            we suspect any violations of these Terms.
          </p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            4. Content and Intellectual Property
          </h2>
          <p className="text-gray-700">
            All content on this Website, including text, graphics, logos, and
            software, is the property of SimpleRSS or its licensors. You are
            granted a limited, non-exclusive license to view and use the content
            for personal purposes. Reproduction or redistribution without
            permission is prohibited.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            5. User-Generated Content
          </h2>
          <p className="text-gray-700">
            If you submit content to SimpleRSS, you grant us a perpetual,
            royalty-free license to use, modify, and distribute it. You affirm
            that your submissions do not violate third-party rights and that you
            are responsible for any legal issues arising from your content.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Third-Party Links</h2>
          <p className="text-gray-700">
            SimpleRSS may include links to third-party websites. We are not
            responsible for the content, privacy policies, or practices of
            third-party sites. Your interactions with these third-party sites
            are at your own risk.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">7. Privacy Policy</h2>
          <p className="text-gray-700">
            Your use of the Website is also governed by our{" "}
            <a href="/privacy-policy" className="text-blue-500">
              Privacy Policy
            </a>
            , which explains how we collect, use, and protect your information.
            Please review it carefully.
          </p>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            8. Disclaimer of Warranties
          </h2>
          <p className="text-gray-700">
            The Website and all content provided through it are offered on an
            "as is" and "as available" basis. SimpleRSS makes no warranties,
            whether express or implied, regarding the Website's performance,
            accuracy, or availability.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            9. Limitation of Liability
          </h2>
          <p className="text-gray-700">
            To the maximum extent permitted by law, SimpleRSS will not be liable
            for any direct, indirect, incidental, or consequential damages
            resulting from your use of the Website.
          </p>
        </section>

        {/* Section 10 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">10. Indemnification</h2>
          <p className="text-gray-700">
            You agree to indemnify and hold SimpleRSS and its affiliates,
            officers, and employees harmless from any claims or damages arising
            from your use of the Website or violation of these Terms.
          </p>
        </section>

        {/* Section 11 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">11. Termination</h2>
          <p className="text-gray-700">
            SimpleRSS reserves the right to suspend or terminate your access to
            the Website for violating these Terms or engaging in harmful
            activities.
          </p>
        </section>

        {/* Section 12 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">12. Governing Law</h2>
          <p className="text-gray-700">
            These Terms are governed by and construed in accordance with the
            laws of [Insert Jurisdiction]. Any legal disputes will be resolved
            in the courts of [Insert Jurisdiction].
          </p>
        </section>

        {/* Section 13 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">13. Changes to Terms</h2>
          <p className="text-gray-700">
            We may update these Terms of service from time to time. It is your
            responsibility to review these Terms regularly. Continued use of the
            Website after changes are made constitutes your acceptance of the
            updated Terms.
          </p>
        </section>

        {/* Section 14 */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            14. Contact Information
          </h2>
          <p className="text-gray-700">
            If you have any questions or concerns about these Terms, please
            contact us at:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              Email:{" "}
              <a href="mailto:support@simple-rss.com" className="text-blue-500">
                support@simple-rss.com
              </a>
            </li>
            <li>Address: [Insert Address]</li>
          </ul>
        </section>

        <p className="text-sm text-gray-500">
          Last updated on 6 September 2024.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
