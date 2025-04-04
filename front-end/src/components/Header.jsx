import { GitHubIcon } from "../components/icons/GitHubIcon.jsx";
import { SearchIcon } from "../components/icons/SearchIcon.jsx";
import { LinkedInIcon } from "../components/icons/LinkedInIcon.jsx";

function Header() {
  return (
    <header>
      <h2><a href="#">To do List</a></h2>
      <div>
        <a href="#"><SearchIcon/></a>
        <a href="https://www.linkedin.com/in/bastian-parra-dev/" target="_blank"><LinkedInIcon/></a>
        <a href="https://github.com/Bastian-Parra" target="_blank"><GitHubIcon/></a>
      </div>
    </header>
  );
}

export default Header;
