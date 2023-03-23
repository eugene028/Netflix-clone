import {useRef} from 'react';
import styled from 'styled-components';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const MovieModal = ({
    backdrop_path,
    title,
    name,
    overview,
    release_date,
    first_air_date,
    vote_average,
    setModalOpen
}) => {
    const ref = useRef();
    console.log(ref);
    useOnClickOutside(ref, () => {setModalOpen(false)}); 
    return (
        <>
            <Presentation>
                <WrapperModal>
                    <Modal ref = {ref}>
                        <ModalClose onClick = {() => {setModalOpen(false)}}>
                            X
                        </ModalClose>
                        <img 
                            className = 'modal__poster-img'
                            src = {`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                            alt = 'modal_poster-img'
                        />
                        <ModalContent>
                            <ModalDetails>
                                <ModalUserPerc>
                                    100% for you
                                </ModalUserPerc>
                                {release_date? release_date : first_air_date}
                            </ModalDetails>
                            <ModalTitle>{title? title : name}</ModalTitle>
                            <ModalOverview>평점 : {vote_average}</ModalOverview>
                            <ModalOverview>{overview}</ModalOverview>
                        </ModalContent>
                    </Modal>
                </WrapperModal>
            </Presentation>
        </>
    );
};

const Presentation = styled.div`
    position : absolute;
    z-index: 1200;
`;

const WrapperModal = styled.div`
    position:fixed;
    inset: 0px;
    background-color : rgb(0 0 0 / 71%);
    display: flex;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
    @media screen and (min-width: 768px) {
        align-items: unset;
        padding-top: 2rem;
    }
`;

const Modal = styled.div`
    @keyframes fadeIn {
        from {
        opacity: 0;
        transform: scale(0.5);
        }
        to {
        opacity: 1;
        transform: scale(1);
        }
    }
    position: relative;
    max-width: 800px;
    box-shadow : 0px 3px 5px -1px rgba(0, 0, 0 0.2),
     0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
    background : #111;
    overflow: hidden;
    border-radius : 8px;
    transition : all 0.4s ease-in-out 2s;
    animation: fadeIn 400ms;
    -ms-overflow-style: none;
    scrollbar-width: none;
    @media screen and (min-width: 768px) {
        overflow-y : scroll;
    }
    .modal__poster-img {
        width: 100%;
        height: auto;
    }
    &::-webkit-scrollbar {
        display: none;
        visibility: hidden;
    }

`;

const ModalClose = styled.span`
    position : absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    z-index:1000;
    color : white;
`;

const ModalContent = styled.div`
    padding: 40px;
    color : white;
`;

const ModalDetails = styled.p`
    font-weight: 600;
    font-size : 18px;
`;

const ModalUserPerc = styled.span`
    color : #46d369;
`;

const ModalTitle = styled.h2`
    padding: 0;
    font-size: 2rem;
    margin: 16px 0;
`;

const ModalOverview = styled.p`
    font-size : 1.3rem;
    line-height : 1.5;
`;


export default MovieModal;