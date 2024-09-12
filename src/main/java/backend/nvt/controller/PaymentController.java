package backend.nvt.controller;

import backend.nvt.service.PaymentStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pay")
public class PaymentController {

    @Autowired
    private PaymentStatusService paymentStatusService;

    @GetMapping("/confirm")
    public ResponseEntity<String> confirmPayment(@RequestParam String token) {
        boolean isValidToken = paymentStatusService.validateToken(token);
        if (isValidToken) {
            paymentStatusService.updateTokenStatus(token);
            paymentStatusService.printEmailStatusMap();

            System.out.println("evo posle mejla");
            paymentStatusService.printEmailStatusMap();
            return ResponseEntity.ok("Payment confirmed for email: ");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired token.");
        }
    }
}
