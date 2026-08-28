# Syntax Forge Downloads

This public repository hosts Windows release files for Syntax Forge. The source project is maintained separately in a private repository.

## Website

Visit **[n3try.github.io/syntax-forge-downloads](https://n3try.github.io/syntax-forge-downloads/)** to view the courses, download the installer, or open an installed copy of Syntax Forge.

The website targets WCAG 2.2 Level AA and includes dedicated [privacy](https://n3try.github.io/syntax-forge-downloads/privacy.html), [terms](https://n3try.github.io/syntax-forge-downloads/terms.html), and [accessibility](https://n3try.github.io/syntax-forge-downloads/accessibility.html) pages. Accessibility problems can be reported through the public issue tracker without including private information.

## Site checks

Install the test tools and run the HTML, automated WCAG, keyboard, text-spacing, touch-target, and 320-pixel reflow checks:

```powershell
npm install
npm test
```

The same checks run in GitHub Actions for changes to the main branch and pull requests.

## Download

The recommended download is the small web installer:

**[Download Syntax Forge Web Setup](https://github.com/n3try/syntax-forge-downloads/releases/latest/download/Syntax.Forge.Web.Setup.exe)**

It downloads the full, checksum-verified application package during setup.

Other choices are available on the [latest release page](https://github.com/n3try/syntax-forge-downloads/releases/latest):

- **Syntax Forge Setup.exe** contains the complete app for offline installation.
- **Syntax Forge Portable.exe** runs without installing.
- **SHA256SUMS.txt** contains verification hashes.

The `.nsis.7z` file is used automatically by Web Setup. It is not a manual download.

## Windows warning

The current builds are not Authenticode-signed. Windows SmartScreen may display an unknown publisher warning until a trusted Windows code-signing certificate is added.
