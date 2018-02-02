function Question(subject, a,b,c,d, ans) {
    this.subject = subject;
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.ans = ans;
}
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
