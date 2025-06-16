
export const AboutSection = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      <h3 className="text-4xl font-bold text-center mb-12 text-purple-400">About CyberX Security Hub</h3>
      <div className="max-w-4xl mx-auto space-y-6 text-gray-300 text-lg">
        <p>
          CyberX Security Hub is a comprehensive educational platform designed for cybersecurity professionals, 
          ethical hackers, and security researchers. Our platform provides hands-on learning experiences with 
          real-world attack scenarios in a controlled, legal environment.
        </p>
        <p>
          Our mission is to educate security professionals about common attack vectors, helping them understand 
          how these attacks work so they can better defend their organizations and clients against cyber threats.
        </p>
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 mt-8">
          <h4 className="text-red-400 font-bold text-xl mb-4">⚠️ IMPORTANT DISCLAIMER</h4>
          <p className="text-red-300">
            This platform is designed exclusively for educational purposes and authorized security testing. 
            All content, tools, and techniques demonstrated here are intended for:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-red-300">
            <li>Cybersecurity education and awareness</li>
            <li>Authorized penetration testing</li>
            <li>Security research in controlled environments</li>
            <li>Understanding attack vectors for defense purposes</li>
          </ul>
          <p className="mt-4 text-red-300 font-semibold">
            Users are solely responsible for ensuring their activities comply with all applicable laws and regulations. 
            Unauthorized use of these techniques against systems you do not own or have explicit permission to test is illegal and unethical.
          </p>
        </div>
      </div>
    </div>
  );
};
