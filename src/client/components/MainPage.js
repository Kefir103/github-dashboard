import React from 'react';

export default function MainPage(props) {
    return (
        <div>
            <form id={'search-form'}>
                <input type={'search'} placeholder={'Введите имя репозитория'}/>
                <button type={'submit'}/>
            </form>
        </div>
    );
}
