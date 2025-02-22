export const oktaConfig = {
    clientId: "0oanhz5ikrm1udyXm5d7",
    issuer: "https://dev-18924232.okta.com",
    redirectUri: "http://localhost:3000/login/callback",
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpCheck: true,
}