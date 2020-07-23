import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Header(props) {
    return (
        <header>
            <h1>Github Dashboard</h1>
            <a href={'https://github.com/Kefir103/github-dashboard'} className={'contact-links'} target={'_blank'}>
                <FontAwesomeIcon icon={faGithub} size={'2x'} color={'whitesmoke'} />
            </a>
        </header>
    );
}
