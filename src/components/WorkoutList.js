import '../App.css';
import WorkoutItem from './WorkoutItem';

function WorkoutList({ items, onDeleteItem, onEditItem }) {
    return (
        <div className='list-wrapper'>
            <div className='item-names'>
                <span className='item-name'>Дата (ДД.ММ.ГГ)</span>
                <span className='item-name'>Пройдено км</span>
                <span className='item-name'>Действия</span>
            </div>
            <table className='list' >
                <tbody>
                    {items.map(item => (
                        <WorkoutItem key={item.id} item={item} onEditItem={onEditItem} onDeleteItem={onDeleteItem} />
                    ))}
                </tbody>
            </table>
        </div>

    );
}

export default WorkoutList;
