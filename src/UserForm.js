import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select';
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema } from './formValidation';
import { useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://localhost:8080/'
// drop down options
const sexOptions = [
  { value: 'M', label: 'M' },
  { value: 'F', label: 'F' },
];

const IdOptions = [
  { value: 'Aadhar', label: 'Aadhar' },
  { value: 'Pan', label: 'Pan' }
];
const guardianOptons = [
  { value: 'Mother', label: 'Mother' },
  { value: 'Father', label: 'Father' },
  { value: 'Guardian', label: 'Guardian' }
];
const stateOptions = [
  { value: 'Maharashtra', label: 'Maharashtra' },
  { value: 'Madhyapradesh', label: 'Madhyapradesh' },
  { value: 'Gujarat', label: 'Gujarat' }
];

const cityOptions = [
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Bengluru', label: 'Bengluru' },
  { value: 'Chennai', label: 'Chennai' }
];
const religionOptions = [
  { value: 'General', label: 'General' },
  { value: 'Hindu', label: 'Hindu' },
  { value: 'Muslim', label: 'Muslim' },
  { value: 'Christian', label: 'Christian' },
  { value: 'Sikh', label: 'Sikh' },
  { value: 'Other', label: 'Other' },
];
const maritalStatusOptions = [
  { value: 'Unmarried', label: 'Unmarried' },
  { value: 'Married', label: 'Married' },
  { value: 'Divorced', label: 'Divorced' }
];
const bloodGroupOptions = [
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' }
];

function UserForm() {
  const [govtIdType, setGovtIdType] = useState(null);
  const [guardian, setGuardian] = useState(null);

  const { register, handleSubmit, reset, formState: { errors }, control } = useForm({ mode: 'onBlur', resolver: yupResolver(userSchema) });

  const onGovtIdTypeSelect = (value, onChange) => {
    console.log('id type: ' + value.value);
    onChange(value.value);
    setGovtIdType(value.value);
  };
  const onGuardianSelect = (value, onChange) => {
    console.log('id type: ' + value.value);
    onChange(value.value);
    setGuardian(value.value);
  };
  const resetForm = () => {
    reset();
  }
  const submitForm = (data) => {
    console.log(data);
    axios.post(baseUrl + 'formDetails', data)
      .then(res => {
        console.log('API data:' + JSON.stringify(res.data));
      })
    reset();
    alert('Your Details are Submitted Successfully!');
  }
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className='container'>
        <div className='row'>
          {/* Personal details */}
          <div className='my-2'>
            <strong style={{ textDecoration: "underline" }}>Personal Details</strong>
          </div>
          <div className='col-5'>
            <div className='row'>
              <div className='col-2'>
                <label className='required' htmlFor='userName'>Username</label>
              </div>
              <div className='col-9'>
                <input id='userName'  placeholder='Enter your Name' className='w-100 required' {...register('userName', { required: true })} />
                {errors.userName && <span style={{ color: 'red' }}>{errors.userName.message}</span>}
              </div>
            </div>
          </div>
          <div className='col-4'>
            <div className='row'>
              <div className='col-4'>
                <label className='required' htmlFor='age'>Date of Birth or Age</label>
              </div>
              <div className='col-8'>
                <input id='age' placeholder='Enter Date of Birth or Age' className='w-100' {...register('age', { required: true })} />
                {errors.age && <span style={{ color: 'red' }}>{errors.age.message}</span>}
              </div>
            </div>
          </div>
          <div className='col-3'>
            <div className='row'>
              <div className='col-3'>
                <label className='required' htmlFor='sex'>Sex</label>
              </div>
              <div className='col-9'>
                <Controller
                  name='sex' control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => <Select id='sex' value={sexOptions.find(c => c.value === value)}
                    onChange={value => onChange(value.value)} options={sexOptions} placeholder='Enter Sex' />}
                />
                {errors.sex && <span style={{ color: 'red' }}>{errors.sex.message}</span>}
              </div>
            </div>
          </div>
          <br />
          <div className='col-5'>
            <div className='row'>
              <div className='col-2'>
                <label className='required' htmlFor='mobile_number'>Mobile Number</label>
              </div>
              <div className='col-5'>
                <input id='mobile_number' placeholder='Enter Mobile Number' className='w-100' {...register('mobile_number', { required: true })} />
                {errors.mobile_number && <span style={{ color: 'red' }}>{errors.mobile_number.message}</span>}
              </div>
            </div>
          </div>
          <div className='col-7'>
            <div className='row'>
              <div className='col-3'>
                <label className='required' htmlFor='govtID'>Govt Issued ID</label>
              </div>
              <div className='col-3'>
                <Controller
                  name='govtIdType' control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => <Select value={IdOptions.find(c => c.value === value)}
                    onChange={value => onGovtIdTypeSelect(value, onChange)} id='govtIdType' options={IdOptions} placeholder='ID Type' />}
                />
                {errors.govtIdType && <span style={{ color: 'red' }}>{errors.govtIdType.message}</span>}
              </div>
              <div className='col-6'>
                <input placeholder='Enter Govt ID' className='w-100' disabled={govtIdType ? false : true} {...register('govtId', { required: true })} />
                {errors.govtId && <span style={{ color: 'red' }}>{errors.govtId.message}</span>}
              </div>
            </div>
          </div>
          {/* Contact details */}
          <div className='my-2'>
            <strong style={{ textDecoration: "underline" }}>contact Details</strong>
          </div>
          <div className='col-5'>
            <div className='row'>
              <div className='col-3'>
                <label htmlFor='govtID'>Guardian Details</label>
              </div>
              <div className='col-4'>
                <Controller
                  name='guardian_details' control={control}
                  render={({ field: { onChange, value } }) => <Select value={guardianOptons.find(c => c.value === value)}
                    onChange={value => onGuardianSelect(value, onChange)} id='guardian_details' options={guardianOptons} placeholder='Guardian' />}
                />
              </div>
              <div className='col-5'>
                <input placeholder='Enter Guardian Name' className='w-100' disabled={guardian === null ? true : false}  {...register('guardian_name', { required: false })} />
                {errors.guardian_name && <span style={{ color: 'red' }}>{errors.guardian_name.message}</span>}
              </div>
            </div>
          </div>
          <div className='col-3'>
            <div className='row'>
              <div className='col-2'>
                <label htmlFor='email'>Email</label>
              </div>
              <div className='col-10'>
                <input id='email' placeholder='Enter Email' className='w-100' {...register('email', { required: false })} />
                {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
              </div>
            </div>
          </div>
          <div className='col-4'>
            <div className='row'>
              <div className='col-5'>
                <label className='required' htmlFor='emergency_contact_number'>Emergency Contact Number</label>
              </div>
              <div className='col-7'>
                <input id='emergency_contact_number' placeholder='Enter Emergency No' className='w-100' {...register('emergency_contact_number', { required: true })} />
                {errors.emergency_contact_number && <span style={{ color: 'red' }}>{errors.emergency_contact_number.message}</span>}
              </div>
            </div>
          </div>
          {/* Address details */}
          <div className='my-2'>
            <strong style={{ textDecoration: "underline" }}>Address Details</strong>
          </div>
          <div className='col-5 my-2'>
            <div className='row'>
              <div className='col-2'>
                <label htmlFor='Address'>Address</label>
              </div>
              <div className='col-9'>
                <input id='Address' placeholder='Enter Address' className='w-100' {...register('address', { required: false })} />
              </div>
            </div>
          </div>
          <div className='col-4 my-2'>
            <div className='row'>
              <div className='col-2'>
                <label htmlFor='state'>State</label>
              </div>
              <div className='col-9'>
                <Controller
                  name='state' control={control}
                  render={({ field: { onChange, value } }) => <Select value={stateOptions.find(c => c.value === value)}
                    onChange={value => onChange(value.value)} id='state' options={stateOptions} placeholder='Enter state' />}
                />
              </div>
            </div>
          </div>
          <div className='col-3 my-2'>
            <div className='row'>
              <div className='col-3'>
                <label htmlFor='city'>City</label>
              </div>
              <div className='col-9'>
                <Controller
                  name='city' control={control}
                  render={({ field: { onChange, value } }) => <Select value={cityOptions.find(c => c.value === value)}
                    onChange={value => onChange(value.value)} id='city' options={cityOptions} placeholder='Enter city/town/village' />}
                />
              </div>
            </div>
          </div>
          <div className='col-5 my-2'>
            <div className='row'>
              <div className='col-2'>
                <label htmlFor='country'>Country</label>
              </div>
              <div className='col-9'>
                <input id='country' placeholder='Enter Country' type='search' className='w-50' {...register('country', { required: false })} />
                {errors.country && <span style={{ color: 'red' }}>{errors.country.message}</span>}
              </div>
            </div>
          </div>
          <div className='col-5 my-2'>
            <div className='row'>
              <div className='col-2'>
                <label htmlFor='pincode'>Pincode</label>
              </div>
              <div className='col-9'>
                <input id='pincode' placeholder='Enter Pincode' className='w-100' {...register('pincode', { required: false })} />
                {errors.pincode && <span style={{ color: 'red' }}>{errors.pincode.message}</span>}
              </div>
            </div>
          </div>
          {/* Other details */}
          <div className='my-2'>
            <strong style={{ textDecoration: "underline" }}>Other Details</strong>
          </div>
          <div className='col-3 my-2'>
            <div className='row'>
              <div className='col-2'>
                <label htmlFor='occupation'>Occupation</label>
              </div>
              <div className='col-9'>
                <input id='occupation' placeholder='Enter Occupation' className='w-100' {...register('occupation', { required: false })} />
                {errors.occupation && <span style={{ color: 'red' }}>{errors.occupation.message}</span>}
              </div>
            </div>
          </div>
          <div className='col-3 my-2'>
            <div className='row'>
              <div className='col-3'>
                <label htmlFor='religion'>Religion</label>
              </div>
              <div className='col-9'>
                <Controller
                  name='religion' control={control}
                  render={({ field: { onChange, value } }) => <Select value={religionOptions.find(c => c.value === value)}
                    onChange={value => onChange(value.value)} id='Religion' options={religionOptions} placeholder='Enter Religion' />}
                />
              </div>
            </div>
          </div>
          <div className='col-3 my-2'>
            <div className='row'>
              <div className='col-3'>
                <label htmlFor='marital_status'>Marital Status</label>
              </div>
              <div className='col-9'>
                <Controller
                  name='marital_status' control={control}
                  render={({ field: { onChange, value } }) => <Select value={maritalStatusOptions.find(c => c.value === value)}
                    onChange={value => onChange(value.value)} id='marital_status' options={maritalStatusOptions} placeholder='Enter Marital Status' />}
                />
              </div>
            </div>
          </div>
          <div className='col-3'>
            <div className='row'>
              <div className='col-3'>
                <label htmlFor='blood_group'>Blood Group</label>
              </div>
              <div className='col-9'>
                <Controller
                  name='blood_group' control={control}
                  render={({ field: { onChange, value } }) => <Select value={bloodGroupOptions.find(c => c.value === value)}
                    onChange={value => onChange(value.value)} id='blood_group' options={bloodGroupOptions} placeholder='Enter Blood Group' />}
                />
              </div>
            </div>
          </div>
          <div className='my-2'>
            <div className='row'>
              <div className='col-1'>
                <label htmlFor='nationality'>Nationality</label>
              </div>
              <div className='col-5'>
                <input id='nationality' placeholder='Enter Nationality' type='search' className='w-50' {...register('nationality', { required: false })} />
                {errors.nationality && <span style={{ color: 'red' }}>{errors.nationality.message}</span>}
              </div>
            </div>
          </div>
          <div className='col-9 position-relative' style={{ fontSize: "15px" }}>
            <button type="button" onClick={resetForm} className='btn btn-outline-danger position-absolute end-0' style={{ fontWeight: "lighter", width: "120px" }}>
              <span>CANCEL</span>
              <br />
              <span>{'(ESC)'}</span>
            </button>
          </div>
          <div className='col-3 position-relative' style={{ fontSize: "15px" }}>
            <button type="submit" className='btn btn-success position-absolute start-50' style={{ fontWeight: "lighter", width: "120px" }}>
              <span>SUBMIT</span>
              <br />
              {'('}
              <span class="fa fa-arrows" style={{ fontSize: '10px', textDecoration: 'underline' }} aria-hidden="true"></span>{'s)'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
export default UserForm;
