import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

interface FormInputProps {
    theme: any; // Assuming you have a theme type defined
}


function Form({ theme }: FormInputProps) {
    // State Definitions
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');


    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);


    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');



    // Handle Input Changes
    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let firstNameValue = event.target.value;

        setFirstName(firstNameValue);
        if (firstNameValue.length < 1) {
            setFirstNameError(true);
            setFirstNameErrorMessage('First Name is required.');
        } else {
            setFirstNameError(false);
            setFirstNameErrorMessage('');
        }
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let lastNameValue = event.target.value;

        setLastName(lastNameValue);
        if (lastNameValue.length < 1) {
            setLastNameError(true);
            setLastNameErrorMessage('Last Name is required.');
        } else {
            setLastNameError(false);
            setLastNameErrorMessage('');
        }
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let emailValue = event.target.value;

        setEmail(emailValue);
        if(!validEmailAddress(emailValue)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
        }
        else {
            setEmailError(false);
            setEmailErrorMessage('');
        }
    };


    // Validation Functions
    const validEmailAddress = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    //Form Submission
    const validateFormInputs = () => {
        if(firstNameError)
            return false;

        if(!firstName)
            return false;

        return true;
    }

    const resetToDefaults = () => {
        setFirstName('');

        setFirstNameError(false);

        setFirstNameErrorMessage('');
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (!validateFormInputs()) {
            event.preventDefault();
            return;
        }

        console.log({
            firstName,
        });

        resetToDefaults();
    }


    return(
        <Box
            sx={{
                width: '100%',
                backgroundColor: theme.palette.background.default, // Use theme paper background color
                padding: { xs: 4, md: 5 }, // Equivalent to p-8 md:p-10
                borderWidth: 1,
                borderStyle: 'solid',
                borderRadius: 6,
                borderColor: theme.palette.primary.light
            }}
        >
            <Typography
                variant="h4"
                component="h4"
                align="center"
                gutterBottom
                sx={{ color: theme.palette.primary.main }}
            >
                Air Fryer
            </Typography>
            <Typography
                variant="body1"
                align="center"
                sx={{ color: theme.palette.text.secondary }}
            >
                Fill out the details below to win a brand-new Air Fryer
            </Typography>

            <Box
                component="form"
                onSubmit={handleFormSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    mt: 4,
                    backgroundColor: theme.palette.background.default,
                }}
            >

                <TextField
                    label="First Name"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    fullWidth
                    variant="outlined"
                    placeholder="John"
                    error={firstNameError}
                    helperText={firstNameErrorMessage}
                />

                <TextField
                    label="Last Name"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={handleLastNameChange}
                    fullWidth
                    variant="outlined"
                    placeholder="Doe"
                    error={lastNameError}
                    helperText={lastNameErrorMessage}
                />

                <TextField
                    label="Email Address"
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    fullWidth
                    variant="outlined"
                    placeholder="you@domain.com"
                    error={emailError}
                    helperText={emailErrorMessage}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={!validateFormInputs()}
                    sx={{ mt: 2 }}
                >
                    Submit
                </Button>

                <Button
                    onClick={resetToDefaults}
                    variant="outlined"
                    fullWidth
                >
                    Reset
                </Button>

            </Box>

        </Box>
    );
}

export default Form;