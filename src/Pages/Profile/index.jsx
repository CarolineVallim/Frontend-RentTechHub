import React, { useState, useContext, useEffect } from 'react';
import { Input, Textarea, Button } from '@nextui-org/react';
import { useDropzone } from 'react-dropzone';
import 'tailwindcss/tailwind.css';
import { AuthContext } from '../../Context/auth.context';

export default function Profile() {
  const [profilePic, setProfilePic] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const { user } = useContext(AuthContext);

  const [fields, setFields] = useState(() => {
    if (user) {
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: '********',
        address: user.address,
      };
    } else {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
      };
    }
  });

  const [initialValues, setInitialValues] = useState({ ...fields });

  useEffect(() => {
    if (user) {
      setFields((prevFields) => ({
        ...prevFields,
        firstName: { ...prevFields.firstName, value: user.firstName || '' },
        lastName: { ...prevFields.lastName, value: user.lastName || '' },
        email: { ...prevFields.email, value: user.email || '' },
        address: { ...prevFields.address, value: user.address || '' },
      }));
    }
  }, [user]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      setProfilePic(URL.createObjectURL(file));
    },
  });

  const handleEditClick = (field) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: { ...prevFields[field], isEditing: true },
    }));
  };

  const handleSaveClick = (field) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: { ...prevFields[field], isEditing: false },
    }));
  };

  const handleCancelClick = (field) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: { ...prevFields[field], isEditing: false },
    }));
  };

  const handleEditField = (field) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: { ...prevFields[field], isEditing: true },
    }));
  };

  const handleChange = (field, value) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: { ...prevFields[field], value },
    }));
  };

  return (
    <div className="container" style={{ paddingTop: '95px' }}>
      <div className="min-h-screen flex items-center justify-center mt-20">
        <div className="max-w-xl p-8 bg-white shadow-lg rounded-md" style={{ width: '60%', borderRadius: '15px', placeItems: 'center', padding:"25px" }}>
          <h1 className="text-2xl font-semibold mb-4" style={{marginTop:"10px", marginBottom:"15px"}}>User Profile</h1>
          {user && (
            <div className="flex items-center mb-4">
              <div
                {...getRootProps()}
                className="w-16 h-16 mr-4 rounded-full overflow-hidden cursor-pointer"
              >
                <input {...getInputProps()} />
                {Object.values(fields).some((field) => field.isEditing) ? (
                  <img
                    src={user.imageProfile || 'https://via.placeholder.com/150'}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={uploadedFile ? URL.createObjectURL(uploadedFile) : user.imageProfile} style={{marginRight:"15px", marginBottom:"10px"}}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <p className="text-lg font-semibold">{`${fields.firstName.value} ${fields.lastName.value}`}</p>
                <p className="text-gray-600">{fields.email.value}</p>
              </div>
            </div>
          )}

          <form className="w-full">
            {Object.entries(fields).map(([fieldName, { value, isEditing }]) => (
              <div key={fieldName} className="mb-4">
                <label className="block text-sm font-medium text-gray-600"  style={{fontWeight:"bold", marginTop:"10px"}} >
                  {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
                </label>
                {isEditing && fieldName !== 'password' ? (
                  <Input
                    type={fieldName === 'password' ? 'password' : 'text'}
                    value={value}
                    onChange={(e) => handleChange(fieldName, e.target.value)}
                  />
                ) : (
                  <p>{value}</p>
                )}
                {isEditing && (
                  <div className="flex items-center space-x-4">
                    <Button onClick={() => handleSaveClick(fieldName)} variant="text">
                      Save
                    </Button>
                    <Button onClick={() => handleCancelClick(fieldName)} variant="outlined">
                      Cancel
                    </Button>
                  </div>
                )}
                {!isEditing && (
                  <div className="flex items-center space-x-4">
                    <Button onClick={() => handleEditField(fieldName)} variant="text">
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
}
