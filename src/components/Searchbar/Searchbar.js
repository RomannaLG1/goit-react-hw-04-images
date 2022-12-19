import PropTypes from 'prop-types';
import { Formik} from 'formik';
// import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcSearch } from 'react-icons/fc';
import * as yup from 'yup';
import { Header, StyledForm, StyledBtn, StyledInput } from './Searchbar.styled';

export const Searchbar = ({ onFormSubmit }) => {
  const initialValues = {
    searchValue: '',
  };

  const schema = yup.object().shape({
    searchValue: yup.string().trim().required(),
  });

  const handleSubmit = (value, { resetForm }) => {
    const normalizeValue = value.searchValue.toLowerCase().trim();
    onFormSubmit(normalizeValue);
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Header>
        <StyledForm>
          <StyledBtn type="submit">
            <FcSearch size={40} />
          </StyledBtn>

          <StyledInput
            name="searchValue"
            type="text"
            // autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </StyledForm>
      </Header>
    </Formik>
  );
};

Searchbar.propTypes = { onSubmit: PropTypes.func };
