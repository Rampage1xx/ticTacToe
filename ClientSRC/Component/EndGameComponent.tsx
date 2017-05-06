import * as React from 'react';
import {Button, Modal} from 'react-bootstrap';

export const EndGameModal = (props) => {

    return (
        <Modal show={props.modal === props.number}>
            <div>
                <p>{props.message}</p>
                <a href='/' className='btn btn-info' role='button'>Play Again!</a>
            </div>
        </Modal>

    );

};