import React from 'react';

export interface CardInterface {
    cardWidth?: number;
    cardHeader: string;
    children: React.ReactNode;
    //children: React.ReactNode;
}

const Card: React.FC<CardInterface> = (props) => {
    const { cardWidth, cardHeader, children} = props;
    const cardHeaderClass = `col-${cardWidth?cardWidth:7} mx-auto`;
    return (
        <div className="container h-100">
            <div className="row align-items-center h-100">
                <div className={cardHeaderClass}>
                    <div className="jumbotron">
                        <div className="card">
                            <div className="card-header text-bg-dark">
                                {cardHeader}
                            </div>
                            <div className="card-body">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default Card;