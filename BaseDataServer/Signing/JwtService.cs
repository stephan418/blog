using BaseDataServer.Models.Users;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace BaseDataServer.Signing
{
    public class JwtService
    {
        private JwtSigningKey _keyManager;
        private IConfiguration _config;

        public JwtService(IConfiguration config)
        {
            _keyManager = JwtSigningKey.FromFiles(@"./signing-key.xml", @"./signing-key.pub.xml");
            _config = config;
        }

        public string ConstructToken(User user)
        {
            ClaimsIdentity claims = new ClaimsIdentity(new List<Claim>() {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
            });

            SecurityTokenDescriptor descriptor = new SecurityTokenDescriptor
            {
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = _keyManager.ConstructJwtSigningCredentials(),
                Issuer = _config["Jwt:Issuer"],
                Subject = claims
            };

            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();

            SecurityToken token = handler.CreateToken(descriptor);
            
            return handler.WriteToken(token);
        }
    }
}
