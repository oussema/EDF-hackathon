import React from 'react' ;
import Item from '../Item/Item';

const List = ({userEmail})=> {
    return (
    <div className="listExterieur" >
        <Item  userEmail = {userEmail} projectNumber='1' itemName="Hydrolectric power production" itemType="water"></Item>
        <Item  userEmail = {userEmail} projectNumber='2' itemName="Wind power production" itemType="wind"></Item>
        <Item  userEmail = {userEmail} projectNumber='3' itemName="Solar power production" itemType="solar"></Item>
    </div>)
}

export default List;