package backend.nvt;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

public class LoginTest {
    private WebDriver driver;

    @BeforeMethod
    public void setUp() {
        // ovo jos nisam resila :"))
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
    }

    @Test
    public void testLogin() {
        driver.get("http://localhost:4200/login");

        WebElement usernameField = driver.findElement(By.name("username"));
        WebElement passwordField = driver.findElement(By.name("password"));

        usernameField.sendKeys("validUsername");
        passwordField.sendKeys("validPassword");

        WebElement loginButton = driver.findElement(By.name("login"));
        loginButton.click();

        Assert.assertTrue(driver.getPageSource().contains("Welcome"));
    }

    @AfterMethod
    public void tearDown() {
        driver.quit();
    }
}

