import '../App.css';

function WorkoutItem({ item, onDeleteItem, onEditItem }) {
    return (
        <tr className='item'>
            <th>{item.date}</th>
            <th>{item.distance}</th>
            <th>
                <div className='item-btns'>
                    <button className='edit-item item-btn' type='button' onClick={() => { onEditItem(item) }}>✍</button>
                    <button className='delete-item item-btn' type='button' onClick={() => { onDeleteItem(item) }}>x</button>
                </div>
            </th>
        </tr>
    );
}

export default WorkoutItem;
