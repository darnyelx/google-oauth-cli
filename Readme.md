<b>Google Oauth V3 Login CLI</b>
<br>
Install `npm i google-oauth-cli`

A simple cli tool to create access tokens for google oauth v3.<br/>Based on code from: https://developers.google.com/youtube/v3/quickstart/nodejs

<b><u>Usage:</u></b>

`google-oauth-cli --client_secret=/path/to/client-secret   --token_path=/path/to/save/token --token_file="token-file-name" --scopes=https://www.googleapis.com/auth/youtube
`

<table>
    <thead>
        <tr>
            <td><b>Parameter</b></td>
            <td><b>Info</b></td> 
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>--client_secret</td>
            <td>
                <h6>Compulsory</h6>
                <p>Google requires you get a client secret from your google developer console.</p>
                <p>Pass in the path (relative or absolute) to the file</p>
            </td>
        </tr>
        <tr>
                    <td>--scope</td>
                    <td>
                        <h6>Compulsory</h6>
                        <p>Google requires you specify the scope you want to access via the token. You can create as many token as possible for a scope</p>
                    </td>
          </tr>
        <tr>
            <td>
                --token_path
            </td>
            <td>
                <h6>Optional</h6>
                Default:"/etc/google-credentials/"<br><br>
              <p>  You can specify the path you want the token_file to be saved in so you can access it easily</p>
            </td>
        </tr>
        <tr>
                    <td>
                        --token_file
                    </td>
                    <td>
                        <h6>Optional</h6>
                      <p>  You can specify the name of the file that holds the token.  </p>
                      <p><b>Note:</b> You do not need to add the <b>.json</b> extension to the file name</p>
                    </td>
                </tr>
    </tbody>
</table>




