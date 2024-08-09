import Link from 'next/link';

const Footer = () => {

    // Inline styles
const footerStyle = {
    // backgroundColor: '#f4f4f4',
    padding: '20px 0',
    textAlign: 'center',
    borderTop: '1px solid #ddd'
  };
  
  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    maxWidth: '1200px',
    margin: '0 auto'
  };
  
  const columnStyle = {
    flex: '1',
    minWidth: '250px',
    margin: '10px'
  };
  
  const linkListStyle = {
    listStyleType: 'none',
    padding: 0
  };
  
  const linkStyle = {
    color: '#333',
    textDecoration: 'none',
    marginBottom: '10px',
    display: 'block'
  };
  
  const socialIconsStyle = {
    display: 'flex',
    justifyContent: 'center'
  };
  
  const iconStyle = {
    margin: '0 10px'
  };
  
  const iconImageStyle = {
    width: '24px',
    height: '24px'
  };
  
  const bottomFooterStyle = {
    marginTop: '20px',
    borderTop: '1px solid #ddd',
    paddingTop: '10px'
  };

    return (
        <footer style={footerStyle}>
            <div style={containerStyle}>
                <div style={columnStyle}>
                    <h3>About Puzzle Mania</h3>
                    <p>Puzzle Mania is your go-to online store for a wide variety of puzzles and jigsaw puzzles. Our mission is to bring joy and challenge to puzzle enthusiasts of all ages.</p>
                </div>
                <div style={columnStyle}>
                    <h3>Quick Links</h3>
                    <ul style={linkListStyle}>
                        <li><Link style={linkStyle} href="/">Home</Link></li>
                        <li><Link style={linkStyle} href="/shop">Shop</Link></li>
                        <li><Link style={linkStyle} href="/faq">FAQ</Link></li>
                        <li><Link style={linkStyle} href="/contact">Contact Us</Link></li>
                    </ul>
                </div>
                <div style={columnStyle}>
                    <h3>Follow Us</h3>
                    <div style={socialIconsStyle}>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={iconStyle}><img src="/facebook-icon.png" alt="Facebook" style={iconImageStyle} /></a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={iconStyle}><img src="/twitter-icon.png" alt="Twitter" style={iconImageStyle} /></a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={iconStyle}><img src="/instagram-icon.png" alt="Instagram" style={iconImageStyle} /></a>
                    </div>
                </div>
                <div style={columnStyle}>
                    <h3>Contact Us</h3>
                    <p><strong>Address:</strong> <br />
                        Puzzle Mania<br />
                        123 Puzzle Street<br />
                        1012 AB Amsterdam<br />
                        Netherlands</p>
                    <p><strong>Email:</strong> <a href="mailto:support@puzzlemania.com">support@puzzlemania.com</a></p>
                    <p><strong>Phone:</strong> <a href="tel:+31234567890">+31 23 456 7890</a></p>
                </div>
            </div>
            <div style={bottomFooterStyle}>
                <p>&copy; 2024 Puzzle Mania. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer