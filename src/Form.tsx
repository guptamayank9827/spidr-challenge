import { Box, Button, FormControl, FormLabel, InputAdornment, TextField, Typography } from '@mui/material';
import { useState } from 'react';

interface FormInputProps {
    theme: any; // Assuming you have a theme type defined
}


function Form({ theme }: FormInputProps) {
    // State Definitions
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [amountError, setAmountError] = useState(false);

    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [amountErrorMessage, setAmountErrorMessage] = useState('');


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

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let amountValue = event.target.value;
    
        setAmount(amountValue);
        if(!validAmount(amountValue)) {
            setAmountError(true);
            setAmountErrorMessage('Please enter a valid estimated amount.');
        } else {
            setAmountError(false);
            setAmountErrorMessage('');
        }
    }


    // Validation Functions
    const validEmailAddress = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validAmount = (amount: string) => {
        // Check if the amount is a valid number and greater than 0
        const amountValue = parseFloat(amount);
        return !isNaN(amountValue) && amountValue > 0;
    };


    //Form Submission
    const validateFormInputs = () => {
        if(firstNameError || lastNameError || emailError || amountError)
            return false;

        if(!firstName || !lastName || !validEmailAddress(email) || !validAmount(amount))
            return false;

        return true;
    }

    const resetToDefaults = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setAmount('');

        setFirstNameError(false);
        setLastNameError(false);
        setEmailError(false);
        setAmountError(false);

        setFirstNameErrorMessage('');
        setLastNameErrorMessage('');
        setEmailErrorMessage('');
        setAmountErrorMessage('');
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (!validateFormInputs()) {
            event.preventDefault();
            return;
        }

        console.log({
            firstName,
            lastName,
            email,
            amount
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
                    textAlign: "left",
                    gap: 3,
                    mt: 4,
                    backgroundColor: theme.palette.background.default,
                }}
            >

                <FormControl>
                    <FormLabel htmlFor="firstName">First Name</FormLabel>
                    <TextField
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
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="lastName">Last Name</FormLabel>
                    <TextField
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
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <TextField
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
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="amount">Estimated Amount</FormLabel>
                    <TextField
                        id="amount"
                        name="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        fullWidth
                        variant="outlined"
                        placeholder="249.99"
                        error={amountError}
                        helperText={amountErrorMessage}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">$</InputAdornment>
                                )
                            }
                        }}
                    />
                </FormControl>

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