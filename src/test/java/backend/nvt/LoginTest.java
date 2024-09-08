package backend.nvt;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.safari.SafariDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class LoginTest {
    private WebDriver driver;

    @BeforeEach
    public void setUp() {
        driver = new SafariDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        System.out.println("Driver is set up: " + (driver != null));
    }

    @Test
    public void testLogin() throws InterruptedException {
        driver.get("http://localhost:4200/login");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement emailField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("email")));
        WebElement passwordField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("password")));

        Thread.sleep(2000);
        emailField.sendKeys("trivuniceva99@gmail.com");

        Thread.sleep(2000);
        passwordField.sendKeys("sad");

        WebElement loginButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector(".btn.btn-primary")));

        Thread.sleep(2000);
        loginButton.click();

        Thread.sleep(2000);
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
