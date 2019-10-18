#include <Arduino.h>

int counter = 0;

void setup()
{
	Serial.begin(9600);
}

void loop()
{
	Serial.print("Hello World\n");// 12 bytes on string + 2 bytes int
	delay(100);
	counter++;
}
