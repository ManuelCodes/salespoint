import React, { useState, useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import InputElement from '../util/InputElement';
import Card from '../util/Card';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { SaleItemData } from '../../interfaces';

interface ISaleItemList {
    data: string | SaleItemData | SaleItemData[];
    error: string | null;
    loading: boolean;
    success: boolean;
    openConfirmDialog(id): void; 
    //onChange(event: React.FormEvent<HTMLInputElement>): void;
}

const SaleItemList: React.FC<ISaleItemList> = (props: ISaleItemList) => {
    const { data, openConfirmDialog } = props;

    const navigate = useNavigate();
    const { initializeSaleItemState, getSaleItems } = useActions();

    const edit = (id) => {
        initializeSaleItemState();
        navigate(`/saleItem/edit/${id}`)
    }

    const productList = () => {
        if( data instanceof Array) {
            return data.map( (saleItemData: SaleItemData) => {
                return (
                    <tr key={saleItemData.id}>
                        <th  className='w-25 p-3 text-truncate' scope="row">{saleItemData.id}</th>
                        <td className='w-25 p-3'>{saleItemData.description}</td>
                        <td className='w-25 p-3'>{saleItemData.stocked}</td>
                        <td className='w-25 p-3'>{saleItemData.price}</td>
                        <td>
                            <i className="bi-pencil me-2" style={{cursor: 'pointer'}} onClick={() => edit(saleItemData.id)} ></i>
                            <i className="bi-trash" style={{cursor: 'pointer'}} onClick={() => openConfirmDialog(saleItemData.id)} ></i>
                        </td>
                    </tr>
                );
            })
        }
    }

    return (
        <div>
            <br/>
            <table style={{margin: 'auto'}} className="table table-hover w-75 p-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Description</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        productList()
                    }
                </tbody>
            </table>
        </div>
    );
};

export default SaleItemList;

