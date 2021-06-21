import { useHistory } from "react-router-dom";

import RealtorsApi from "../../api/realtors";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCurrentRealtor } from "../../store/actions";

const Select = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { realtors, currentRealtor } = useAppSelector((state) => state);

  const updateCurrentRealtor = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    try {
      const newCurrentRealtorId = parseInt(event.target.value, 10);
      const realtor = await RealtorsApi.getOneRealtor(newCurrentRealtorId);
      dispatch(setCurrentRealtor(realtor.data));
      history.push(`/${realtor.data.id}`);
    } catch (error) {
      //display error message
    }
  };

  const selectOptions = () => {
    if (realtors.length) {
      return realtors.map((realtor: Realtor) => {
        return (
          <option key={realtor.id} value={realtor.id}>
            {realtor.name}
          </option>
        );
      });
    }
  };

  return (
    <select
      onChange={updateCurrentRealtor}
      value={currentRealtor?.id}
      className="select"
    >
      {!currentRealtor && <option>Agence</option>}
      {selectOptions()}
    </select>
  );
};

export default Select;
