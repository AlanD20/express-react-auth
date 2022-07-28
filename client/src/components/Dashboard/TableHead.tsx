import { useState } from 'react';
import { LocalUser } from './UserRow';
import { setSelectAll, setSession } from '@/features/sessionSlice';
import { useAppDispatch, useAppSelector } from '@/common/store';

const TableHead = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.session.data?.users)!;
  const selectAll = useAppSelector((state) => state.session.selectAll)!;

  const handleSelectAll = () => {
    const usersSelection = users.map((u: LocalUser) => ({
      ...u,
      isChecked: !selectAll,
    }));

    dispatch(
      setSelectAll({
        selectAll: !selectAll,
      })
    );

    dispatch(
      setSession({
        data: {
          users: usersSelection,
        },
      })
    );
  };

  return (
    <thead className="mt-2 sticky top-0 z-50">
      <tr>
        <th>
          <label>
            <input
              type="checkbox"
              className="checkbox border-2 border-gray-700 border-solid"
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </label>
        </th>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Status</th>
        <th>Registered At</th>
        <th>Last Login</th>
      </tr>
    </thead>
  );
};
export default TableHead;
