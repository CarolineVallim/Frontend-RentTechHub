import React, { useState } from 'react';
import { Input, Textarea, Button } from '@nextui-org/react';
import { useDropzone } from 'react-dropzone';
import 'tailwindcss/tailwind.css';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const [fields, setFields] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: '********',
    address: '123 Main St, City',
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      setProfilePic(URL.createObjectURL(file));
    },
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleEditField = (field) => {
    setIsEditing(true);
    switch (field) {
      case 'firstName':
      case 'lastName':
      case 'email':
      case 'password':
      case 'address':
        setFields((prevFields) => ({
          ...prevFields,
          [field]: '',
        }));
        break;
      case 'profilePic':
        setProfilePic('');
        setUploadedFile(null);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container" style={{ paddingTop: '95px' }}>
      <div className="min-h-screen flex items-center justify-center mt-20">
        <div className="max-w-xl p-8 bg-white shadow-lg rounded-md" style={{width:"60%", borderRadius:"15px", placeItems:"center"}}>
          <h1 className="text-2xl font-semibold mb-4">User Profile</h1>
          <div className="flex items-center mb-4">
            <div
              {...getRootProps()}
              className="w-16 h-16 mr-4 rounded-full overflow-hidden cursor-pointer"
            >
              <input {...getInputProps()} />
              {isEditing ? (
                <img
                  src={profilePic || 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={uploadedFile ? URL.createObjectURL(uploadedFile) : profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <p className="text-lg font-semibold">{`${fields.firstName} ${fields.lastName}`}</p>
              <p className="text-gray-600">{fields.email}</p>
            </div>
          </div>

          <form className="w-full">
            {Object.entries(fields).map(([fieldName, value]) => (
              <div key={fieldName} className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
                </label>
                {isEditing ? (
                  <Input
                    type={fieldName === 'password' ? 'password' : 'text'}
                    value={fields[fieldName]}
                    onChange={(e) =>
                      setFields((prevFields) => ({
                        ...prevFields,
                        [fieldName]: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p>{value}</p>
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
            <div className="flex items-center space-x-4">
              {isEditing && (
                <>
                  <Button
                    onClick={handleSaveClick}
                    className="bg-primary text-white hover:bg-primary-dark"
                  >
                    Save
                  </Button>
                  <Button onClick={handleCancelClick} variant="outlined">
                    Cancel
                  </Button>
                </>
              )}
              {!isEditing && (
                <Button onClick={handleEditClick} className="bg-primary text-white">
                  Edit Profile
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
