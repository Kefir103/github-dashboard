import React from 'react';
import history from '../../history';
import { num2str } from '../../localeFunctions';

export default function ListItem(props) {
    return (
        <div
            className={'list-item'}
            onClick={() => {
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
