using System.Security.Cryptography;

namespace BaseDataServer.Signing
{
    public record struct XmlKeys(string publicXml, string privateXml);

    public class SigningKeyHelper
    {
        public XmlKeys GenerateXmlRsaKeys()
        {
            RSACryptoServiceProvider rsa = new RSACryptoServiceProvider();

            return new XmlKeys(rsa.ToXmlString(false), rsa.ToXmlString(true));
        }

        private void WriteKeyFiles(XmlKeys keys)
        {
            File.WriteAllText(@"./signing-key.pub.xml", keys.publicXml);
            File.WriteAllText(@"./signing-key.xml", keys.privateXml);
        }

        public void GenerateAndWriteKeys()
        {
            XmlKeys keys = GenerateXmlRsaKeys();
            WriteKeyFiles(keys);
        }
    }
}
