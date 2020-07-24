import React, {useEffect} from 'react';
import ListItem from './ListItem';
import Paginator from './Paginator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { bindActionCreators } from 'redux';
import { loadRepos } from '../../redux/actions/repoActions';
import {
    getCurrentPage,
    getSearchText,
    setCurrentPage,
    setSearchText,
} from '../../redux/actions/filterActions';
import { connect } from 'react-redux';

function MainPage(props) {
    const handleSearchInputChange = (event) => {
        event.preventDefault();
        props.actions.setSearchText(event.target.value);
    };

    const handleSubmitClick = (event) => {
        event.preventDefault();
        props.actions.loadRepos(props.searchText, props.currentPage);
    };

    const handleCurrentPageChange = (page) => {
        props.actions.setCurrentPage(page);
    };

    useEffect(() => {
        props.actions.loadRepos(props.searchText, props.currentPage);
    }, [props.currentPage, props.totalCount]);

    return (
        <div className={'app-container'}>
            <form id={'search-form'}>
                <button type={'submit'} onClick={handleSubmitClick}>
                    <FontAwesomeIcon icon={faSearch} color={'whitesmoke'} />
                </button>
                <input
                    type={'search'}
                    placeholder={'Введите имя репозитория'}
                    onChange={handleSearchInputChange}
                    defaultValue={props.searchText}
                />
            </form>
            {props.repos && props.repos.length !== 0
                ? [
                      props.repos.map((repository) => {
                          return <ListItem repository={repository} />;
                      }),
                      <Paginator
                          handleElementChanged={handleCurrentPageChange}
                          currentPage={props.currentPage}
                          totalCount={props.totalCount}
                      />,
                  ]
                : ''}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        repos: state.repository.repos,
        totalCount: state.repository.totalCount,
        searchText: state.filter.searchText,
        currentPage: state.filter.currentPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                loadRepos,
                setCurrentPage,
                getCurrentPage,
                setSearchText,
                getSearchText,
            },
            dispatch
        ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
