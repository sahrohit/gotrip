import { Avatar, Text, Button, Paper } from '@mantine/core';

const ProfilePanel = ({currentUser}) => {

    console.log(currentUser.photoURL)

	return (
            <Paper
              radius="md"
              withBorder
              p="lg"
              sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
              })}
            >
              <Avatar src={currentUser.photoURL} size={120} radius={120} mx="auto" />
              <Text align="center" size="lg" weight={500} mt="md">
                {currentUser.displayName}
              </Text>
              <Text align="center" color="dimmed" size="sm">
                {currentUser.email} 
              </Text>
        
              <Button variant="default" fullWidth mt="md">
                Send message    
              </Button>
            </Paper>
	);
};

export default ProfilePanel;
