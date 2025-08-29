const registerTemplate = (email, name) => {
  return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset='UTF-8'>
        <title>Welcome to BookWorm</title>
        <style>
          body {
            background-color: #fdfdfd;
            font-family: 'Segoe UI', Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            color: #333333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            background-color: #ffffff;
          }
          .logo {
            max-width: 180px;
            margin-bottom: 20px;
          }
          .title {
            font-size: 22px;
            font-weight: bold;
            color: #5a3e85;
            margin-bottom: 20px;
          }
          .body {
            font-size: 16px;
            margin-bottom: 20px;
          }
          .highlight {
            font-weight: bold;
            color: #000000;
          }
          .support {
            font-size: 14px;
            color: #666666;
            margin-top: 20px;
          }
          .btn {
            display: inline-block;
            padding: 12px 24px;
            margin-top: 20px;
            background-color: #5a3e85;
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class='container'>
          <a href=''>
            <img class='logo' src='' alt='BookWorm Logo'>
          </a>
          <div class='title'>📚 Welcome to BookWorm!</div>
          <div class='body'>
            <p>Hi ${name},</p>
            <p>
              Your account has been successfully created with the email 
              <span class='highlight'>${email}</span>.
            </p>
            <p>
              Dive into the world of books, share reviews, and connect with fellow readers.
            </p>
            <a class='btn' href=''>Start Reading</a>
          </div>
          <div class='support'>
            Need help? Contact us at 
            <a href='mailto:support@bookworm.com'>support@bookworm.com</a>.
          </div>
        </div>
      </body>
    </html>`;
};

export default registerTemplate;
