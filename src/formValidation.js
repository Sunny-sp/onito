import * as yup from 'yup';
import moment from 'moment/moment';

const mobileNumberRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const userSchema = yup.object({
    userName: yup.string().required('Please enter your name!').min(3, 'Please provide a valid name!').matches(/^[A-Za-z ]*$/, 'Please provide a valid name!'),
    age: yup.mixed().required('please provide age!').test('test-age', 'Please provide valid age!' , function(value) {
        if(value.length < 3){
            if(value < 100 && value > 0){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return true;
        }
    }).test('test-date-of-birth', 'Date must be in format dd/mm/yyyy', (value) => {
        if(value.length > 2){
            return moment(value, 'DD/MM/YYYY').isValid();
        }
        else{
            return true;
        }
    }).test('test-date-range', 'date must be valid!', (value) => {
        if(value.length > 2){
            if(moment(value, 'L').isValid()){
                return moment(value).isBetween('01/01/1920', moment().format('DD/MM/YYYY'));
            }
            else{
                return true;
            }
        }
        else{
            return true;
        }
    }),
    sex: yup.string().required('Please select sex!'),
    mobile_number: yup.string().required('Please enter mobile number!').matches(mobileNumberRegex, 'please provide valid number!').min(10, 'Please provide 10 digits!')
    .max(10, 'Please provide 10 digits!'),
    emergency_contact_number: yup.string().required('Please enter emergency contact number!').matches(mobileNumberRegex, 'please provide valid number!').min(10, 'Please provide 10 digits!')
    .max(10, 'Please provide 10 digits!'),
    govtIdType: yup.string().required('Please select govt ID').oneOf(['Aadhar', 'Pan']),
    govtId: yup.mixed().nullable().optional().when('govtIdType',{
        is: govtIdType => govtIdType !== null && govtIdType !== undefined,
        then: () => yup.string().when('govtIdType', {
            is: govtIdType => govtIdType === 'Aadhar',
            then: () => yup.string().required('please provide Aadhar!').matches(/^[0-9]{4}\s{1}[0-9]{4}\s{1}[0-9]{4}$/, 'Please provide Aadhar in format (xxxx xxxx xxxx)').matches(/^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/, 'Please provide valid Aadhar'),
            otherwise: () => yup.string().required('Please provide Pan Id!').matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Please provide valid Pan Id!').min(10, 'Please provide valid Pan Id!').max(10, 'Please provide valid Pan Id!'),
        }),
        otherwise: () => yup.string().optional().nullable()
    })
},[
    ['govtIdType', 'govtIdType'],
]);
