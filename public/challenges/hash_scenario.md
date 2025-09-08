
# Challenge: Malleable MAC

You are auditing a web service for a fictional gaming company. The service provides item grants to players via an API endpoint. To prevent users from granting themselves items, the request is authenticated with a Message Authentication Code (MAC).

The API request looks like this:
`https://api.game.ctf/grant?user=player1&item=gold&qty=100&mac=SOME_HEX_MAC`

You've discovered through source code analysis that the MAC is generated using a vulnerable scheme: `mac = SHA1(SECRET_KEY || query_string)`, where `query_string` is `user=player1&item=gold&qty=100`. The `SECRET_KEY` is unknown, but you know its length is 16 bytes.

Your goal is to abuse this scheme to grant yourself a powerful item. You need to append `&item=legendary_sword&qty=1` to the original query string and generate a valid MAC for this new, extended message. You must do this *without knowing the secret key*.

This is a classic Hash Length Extension attack. Because SHA-1 is a Merkle–Damgård construction, given `H(data)` and `length(data)`, you can compute `H(data || padding || new_data)`.

**Your Task:**
Describe the steps you would take and the tools you would use to generate the new query string and the valid MAC. The flag for this challenge is a common phrase associated with this type of attack, formatted as a flag.

**The Flag:**
`Dark_Flag{H4sh_L3ngth_3xt3nsi0n_FTW}`

**Note:** This is a theoretical challenge. You do not need to perform the attack. The solution is to understand the concept and identify the flag.
