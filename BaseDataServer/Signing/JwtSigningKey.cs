using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;

namespace BaseDataServer.Signing
{
    public class JwtSigningKey
    {
        private XmlKeys _keys;
        private RSA _privateRsa;
        private RSA _publicRsa;

        private JwtSigningKey() {
            _privateRsa = RSA.Create();
            _publicRsa = RSA.Create();
        }

        public JwtSigningKey(XmlKeys keys) : this()
        {
            _keys = keys;
        }

        public static JwtSigningKey FromFiles(string privatePath, string publicPath)
        {
            string privateXmlKey = File.ReadAllText(privatePath);
            string publicXmlKey = File.ReadAllText(publicPath);

            return new JwtSigningKey(new XmlKeys(publicXmlKey, privateXmlKey));
        }

        public SecurityKey ConstructPrivateSigningKey()
        {
            _privateRsa.FromXmlString(_keys.privateXml);

            return new RsaSecurityKey(_privateRsa);
        }

        public SecurityKey ConstructPublicSigningKey()
        {
            _publicRsa.FromXmlString(_keys.publicXml);

            return new RsaSecurityKey(_publicRsa);
        }

        public SigningCredentials ConstructJwtSigningCredentials()
        {
            SecurityKey key = ConstructPrivateSigningKey();

            return new SigningCredentials(key, SecurityAlgorithms.RsaSha256);
        }
    }
}
