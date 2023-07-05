import { Box, CircularProgress, Typography } from "@mui/material"

interface Props {
    message?: string
}

export default function LoadingComponent({ message = 'Loading...' }: Props) {
    return (
    <Box alignItems='center' display='flex' flexDirection='column' justifyContent='center' height='100vh'>
        <CircularProgress size={100} color='inherit' className="mb-5"/>
        <Typography variant='h4' sx={{ justifyContent: "center", color:'gray'}}>{message}</Typography>
    </Box>
    )
}