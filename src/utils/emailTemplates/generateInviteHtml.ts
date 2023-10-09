export const generateInviteEmail = (
  recipientName: string,
  recipientEmail: string,
  adminName: string,
  acceptInviteUrl: string,
): string => {
  return `<!DOCTYPE html>

<html
  lang="en"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:v="urn:schemas-microsoft-com:vml"
>
  <head>
    <title></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <!--[if mso
      ]><xml
        ><o:OfficeDocumentSettings
          ><o:PixelsPerInch>96</o:PixelsPerInch
          ><o:AllowPNG /></o:OfficeDocumentSettings></xml
    ><![endif]-->
    <style>
      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        padding: 0;
      }

      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
      }

      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
      }

      p {
        line-height: inherit;
      }

      .desktop_hide,
      .desktop_hide table {
        mso-hide: all;
        display: none;
        max-height: 0px;
        overflow: hidden;
      }

      .image_block img + div {
        display: none;
      }

      @media (max-width: 620px) {
        .mobile_hide {
          display: none;
        }

        .row-content {
          width: 100% !important;
        }

        .stack .column {
          width: 100%;
          display: block;
        }

        .mobile_hide {
          min-height: 0;
          max-height: 0;
          max-width: 0;
          overflow: hidden;
          font-size: 0px;
        }

        .desktop_hide,
        .desktop_hide table {
          display: table !important;
          max-height: none !important;
        }
      }
    </style>
  </head>
  <body
    style="
      background-color: #fff;
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    "
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      class="nl-container"
      role="presentation"
      style="
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        width: 528px;
        padding: 32px;
      "
    >
      <tbody>
        <tr>
          <td>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-1"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000;
                        width: 610px;
                      "
                    >
                      <tbody>
                        <tr>
                          <td>
                            <img
                              style="width: 88px; height: 37px"
                              src="https://res.cloudinary.com/dahlgsh5y/image/upload/v1696383624/EN1_Logo_Colored-01_2_mvb7xe.png"
                              alt="en1"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                          >
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #344054;
                                      direction: ltr;
                                      font-family: Arial, Helvetica, sans-serif;
                                      font-size: 16px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 19.2px;
                                    "
                                  >
                                    <p style="margin: 0; margin-bottom: 7px">
                                      Hi ${recipientName},
                                    </p>
                                    <br />
                                    <p style="margin: 0">
                                      ${adminName} has invited you to join the team on
                                      <strong>EN1</strong>.
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="row row-2"
              role="presentation"
              style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row-content stack"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        color: #000;
                      "
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              font-weight: 400;
                              text-align: left;
                              padding-bottom: 5px;
                              padding-top: 5px;
                              vertical-align: top;
                              border-top: 0px;
                              border-right: 0px;
                              border-bottom: 0px;
                              border-left: 0px;
                            "
                          >
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="button_block block-1"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <div align="left" class="alignment">
                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:42px;width:167px;v-text-anchor:middle;" arcsize="24%" stroke="false" fillcolor="#151515"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]-->
                                    <a href="${acceptInviteUrl}"
                                      style="
                                        text-decoration: none;
                                        display: inline-block;
                                        color: #ffffff;
                                        background-color: #151515;
                                        border-radius: 10px;
                                        width: auto;
                                        border-top: 0px solid transparent;
                                        font-weight: 400;
                                        border-right: 0px solid transparent;
                                        border-bottom: 0px solid transparent;
                                        border-left: 0px solid transparent;
                                        padding-top: 5px;
                                        padding-bottom: 5px;
                                        font-family: Arial, Helvetica,
                                          sans-serif;
                                        font-size: 16px;
                                        text-align: center;
                                        mso-border-alt: none;
                                        word-break: keep-all;
                                      "
                                    >
                                      <span
                                        style="
                                          padding-left: 25px;
                                          padding-right: 25px;
                                          font-size: 16px;
                                          display: inline-block;
                                          letter-spacing: normal;
                                        "
                                        ><span
                                          style="
                                            word-break: break-word;
                                            line-height: 32px;
                                          "
                                          >Accept the invite</span
                                        ></span
                                      >
                                    </a>
                                    <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-2"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #344054;
                                      direction: ltr;
                                      font-family: Arial, Helvetica, sans-serif;
                                      font-size: 16px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 19.2px;
                                    "
                                  >
                                    <p style="margin: 0; margin-bottom: 8px">
                                      Thanks,
                                    </p>
                                    <p style="margin: 0">The team</p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <br />
                            <br />
                            <table
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              class="paragraph_block block-3"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      color: #101112;
                                      direction: ltr;
                                      font-family: Arial, Helvetica, sans-serif;
                                      font-size: 14px;
                                      font-weight: 400;
                                      letter-spacing: 0px;
                                      line-height: 120%;
                                      text-align: left;
                                      mso-line-height-alt: 19.2px;
                                      width: 500px;
                                    "
                                  >
                                    <p
                                      style="
                                        margin: 0;
                                        color: #475467;
                                        font-size: 14px;
                                      "
                                    >
                                      This email was sent to
                                      <span
                                        style="font-weight: 500; color: #151515"
                                        >${recipientEmail}.</span
                                      >
                                      If you'd rather not receive this kind of
                                      email, you can
                                      <span
                                        style="font-weight: 500; color: #151515"
                                      >
                                        unsubscribe</span
                                      >
                                      or
                                      <span
                                        style="font-weight: 500; color: #151515"
                                        >manage your email preferences.</span
                                      >
                                      <br />
                                      <br />
                                      <br />
                                      <span
                                        >© 2077 EN1 UI, 100 Smith Street,
                                        Melbourne VIC 3000</span
                                      >
                                    </p>
                                    <br />
                                    <br />
                                    <br />
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <img
                                    style="width: 88px; height: 37px"
                                    src="https://res.cloudinary.com/dahlgsh5y/image/upload/v1696383624/EN1_Logo_Colored-01_2_mvb7xe.png"
                                    alt="en1"
                                  />
                                </td>
                                <td style="display: flex; justify-content: end">
                                  <a style="margin-right: 16px">
                                    <img alt="twitter" src="https://res.cloudinary.com/dahlgsh5y/image/upload/v1696866971/Social_icon_dn0i84.png" style="width:20px; height:21px; "/>
                                  </a>
                                  <a style="margin-right: 16px"
                                    ><img alt="facebook" src="https://res.cloudinary.com/dahlgsh5y/image/upload/v1696866973/Social_icon_1_nxikb9.png" style="width:20px; height:21px; "/></a>
                                  <a>
                                    <img alt="instagram" src="https://res.cloudinary.com/dahlgsh5y/image/upload/v1696866971/Group_z0tcwm.png" style="width:20px; height:21px; "/>
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- End -->
  </body>
</html>
`;
};
