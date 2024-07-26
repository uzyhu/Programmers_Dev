import { FC } from 'react'
import { IList } from '../../types';
import List from '../List/List';
import ActionButton from '../ActionButton/ActionButton';
import { listContainer } from './ListContainer.css';

type TListsContainerProps = {
  boardId: string;
  lists: IList[];
}

const ListContainer: FC<TListsContainerProps> = ({
  lists,
  boardId
}) => {
  return (
    <div className={listContainer}>
      {
        lists.map(list => (
          <List 
          key={list.listId} 
          list={list}
          boardId = {boardId}
          />
        ))
      }
      <ActionButton
        boardId={boardId}
        listId={""}
        list
      ></ActionButton>
    </div>
  )
}

export default ListContainer