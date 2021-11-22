package world.ucode.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Component;
import world.ucode.models.User;
import world.ucode.services.UserService;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Random;

@Component
public class SendMail {
    @Autowired
    JavaMailSender mailSender;
    @Autowired
    SimpleMailMessage templateMessage;
    @Autowired
    private UserService userService;
    @Async
    public void sendMailConfirmation(User user) throws UnknownHostException {
        SimpleMailMessage mailMessage = new SimpleMailMessage(templateMessage);
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject("Registration confirmation");
        mailMessage.setText("To confirm your account, please click here : "
                + "http://" + InetAddress.getLocalHost().getHostAddress() + ":8080/ubay/confirmation/?token=" + user.getToken());
         mailSender.send(mailMessage);
    }
    public void sendMailPassword(String login) throws UnknownHostException {
        SimpleMailMessage mailMessage = new SimpleMailMessage(templateMessage);
        String newPassword = generatePassword();
        User user = userService.findUser(login);
        user.setPassword(BCrypt.hashpw(newPassword, BCrypt.gensalt()));
        userService.updateUser(user);
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject("Forgot password");
        mailMessage.setText("Your new password is: "
                + newPassword);
        mailSender.send(mailMessage);
    }
    private String generatePassword() {
        String capitalCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
        String specialCharacters = "!@#$";
        String numbers = "1234567890";
        String combinedChars = capitalCaseLetters + lowerCaseLetters + specialCharacters + numbers;
        Random random = new Random();
        StringBuilder password = new StringBuilder("        ");

        password.setCharAt(0, lowerCaseLetters.charAt(random.nextInt(lowerCaseLetters.length())));
        password.setCharAt(1, capitalCaseLetters.charAt(random.nextInt(capitalCaseLetters.length())));
        password.setCharAt(2, specialCharacters.charAt(random.nextInt(specialCharacters.length())));
        password.setCharAt(3, numbers.charAt(random.nextInt(numbers.length())));

        for(int i = 4; i< 8; i++) {
            password.setCharAt(i, combinedChars.charAt(random.nextInt(combinedChars.length())));
        }
        return password.toString();
    }
}