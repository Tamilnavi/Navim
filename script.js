function calculateFlames() {
    var yourName = document.getElementById("yourName").value.trim().toLowerCase();
    var partnerName = document.getElementById("partnerName").value.trim().toLowerCase();
    
    // Removing spaces from names
    yourName = yourName.replace(/\s/g, '');
    partnerName = partnerName.replace(/\s/g, '');
    
    // Calculate FLAMES
    var flames = "FLAMES";
    var count = 0;
    
    for (var i = 0; i < yourName.length; i++) {
        var index = partnerName.indexOf(yourName[i]);
        if (index !== -1) {
            yourName = yourName.substring(0, i) + yourName.substring(i + 1);
            partnerName = partnerName.substring(0, index) + partnerName.substring(index + 1);
            i--;
            count++;
        }
    }

    var totalCount = yourName.length + partnerName.length;
    var flamesIndex = totalCount % 6;

    // Determine result
    var result;
    switch (flamesIndex) {
        case 0:
            result = "Friends";
            break;
        case 1:
            result = "Lovers";
            break;
        case 2:
            result = "Affectionate";
            break;
        case 3:
            result = "Marriage";
            break;
        case 4:
            result = "Enemies";
            break;
        case 5:
            result = "Siblings";
            break;
    }

    document.getElementById("result").innerHTML = result;

    // Send data to Formspree
    var formData = new FormData();
    formData.append("Your Name", document.getElementById("yourName").value.trim());
    formData.append("Partner's Name", document.getElementById("partnerName").value.trim());
    formData.append("Result", result);

    fetch('https://formspree.io/f/mnqeljky', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });
}