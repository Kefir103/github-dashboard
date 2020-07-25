import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSearchText, setSearchText } from '../redux/actions/filterActions';
import {loadRepos} from "../redux/actions/repoActions";

function Header(props) {
    const handleSearchInputChange = (event) => {
        event.preventDefault();
        props.actions.setSearchText(event.target.value);
    };

    const handleSubmitClick = (event) => {
        event.preventDefault();
        props.actions.loadRepos(props.searchText, props.currentPage);
    };

    return (
        <header>
            <h1>Github Dashboard</h1>
            <form id={'search-form'}>
                <button type={'submit'} onClick={handleSubmitClick}>
                    <FontAwesomeIcon icon={faSearch} color={'#0072AA'} />
                </button>
                <input
                    type={'search'}
                    placeholder={'Введите имя репозитория'}
                    onChange={handleSearchInputChange}
                    defaultValue={props.searchText}
                />
            </form>
            <a
                href={'https://github.com/Kefir103/github-dashboard'}
                className={'contact-links'}
                target={'_blank'}>
                <FontAwesomeIcon icon={faGithub} size={'2x'} color={'whitesmoke'} />
            </a>
        </header>
    );
}

const mapStateToProps = (state) => {
    return {
        searchText: state.filter.searchText,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                setSearchText,
                getSearchText,
                loadRepos,
            },
            dispatch
        ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
