import React from 'react';
import { num2str } from '../../localeFunctions';

export default function Contributor(props) {
    return (
        <div className={'contributor'}>
            <h4>
                {props.index}. {props.contributor.login}
            </h4>
            <p>
                ({props.contributor.contributions}{' '}
                {num2str(props.contributor.contributions, [
                    'контрибьюция',
                    'контрибьюции',
                    'контрибьюций',
                ])}
                )
            </p>
            <a href={props.contributor.html_url}>{props.contributor.html_url}</a>
        </div>
    );
}
