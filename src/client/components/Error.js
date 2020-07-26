import React from 'react';
import { connect } from 'react-redux';

function Error(props) {
    return (
        <div className={'app-container error'}>
            <h1>Упс :(</h1>
            <h2>Произошла ошибочка...</h2>
            {props.catchedError ? (
                <h3>
                    ({props.catchedError.status} ({props.catchedError.statusText}))
                </h3>
            ) : (
                ''
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        catchedError: state.appStatus.catchedError,
    };
};

export default connect(mapStateToProps)(Error);
