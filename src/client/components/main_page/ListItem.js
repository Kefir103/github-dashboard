import React from 'react';
import history from '../../history';
import { num2str } from '../../localeFunctions';
import { bindActionCreators } from 'redux';
import { setCurrentRepository } from '../../redux/actions/repoActions';
import { connect } from 'react-redux';

export function ListItem(props) {
    return (
        <div
            className={'list-item'}
            onClick={() => {
                props.actions.setCurrentRepository({ ...props.repository });
                history.push(`/repos/${props.repository.name}`, { ...props.repository });
            }}>
            <h4>
                {props.repository.name} ({props.repository.stargazers_count}{' '}
                {num2str(props.repository.stargazers_count, ['звезда', 'звезды', 'звезд'])})
            </h4>
            <p>Последнее изменение: {new Date(props.repository.pushed_at).toLocaleString()}</p>
            <p>
                URL: <a href={props.repository.html_url}>{props.repository.html_url}</a>
            </p>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                setCurrentRepository,
            },
            dispatch
        ),
    };
};

export default connect(null, mapDispatchToProps)(ListItem);
