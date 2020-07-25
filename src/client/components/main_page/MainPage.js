import React, { useEffect } from 'react';
import ListItem from './ListItem';
import Paginator from './Paginator';
import { bindActionCreators } from 'redux';
import { loadRepos } from '../../redux/actions/repoActions';
import { getCurrentPage, setCurrentPage } from '../../redux/actions/filterActions';
import { connect } from 'react-redux';
import Loading from '../Loading';

function MainPage(props) {
    const handleCurrentPageChange = (page) => {
        props.actions.setCurrentPage(page);
    };

    useEffect(() => {
        props.actions.loadRepos(props.searchText, props.currentPage);
    }, [props.currentPage]);

    return (
        <>
            {!props.isLoading ? (
                <div className={'app-container'}>
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
            ) : (
                <Loading />
            )}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        repos: state.repository.repos,
        totalCount: state.repository.totalCount,
        currentPage: state.filter.currentPage,
        isLoading: state.appStatus.isLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                loadRepos,
                setCurrentPage,
                getCurrentPage,
            },
            dispatch
        ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
