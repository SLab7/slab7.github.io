import './theme.scss';
import 'bootstrap';

$(function() {
    activate();

    function activate() {
        $('.HelpPhrase').each(function() {
            addPhraseData($(this));
        });
        doEverything();
    }

    function doEverything() {
        read(function() {
            deleteHelp($('.HelpPhrase.active'), function() {
                changeActive($('.HelpPhrase.active'));
                typeHelp($('.HelpPhrase.active'), doEverything);
            });
        });
    }

    function addPhraseData($helpPhrase) {
        var $helpPhraseTyper = $helpPhrase.find('.HelpPhrase__typer');
        $helpPhraseTyper.data('phrase', $helpPhraseTyper.text());
        if (!$helpPhrase.hasClass('active')) {
            $helpPhraseTyper.empty();
        }
    }

    function typeHelp($helpPhrase, callback) {
        var $helpPhraseTyper = $helpPhrase.find('.HelpPhrase__typer');
        var phrase = $helpPhraseTyper.data('phrase');
        var length = phrase.length;
        var count = 0;
        var typer = setInterval(function() {
            if (count > length) {
                clearInterval(typer);
                callback();
            }
            count = count + 1;
            $helpPhraseTyper.text(phrase.substring(0, count));
        }, 60);
    }

    function deleteHelp($helpPhrase, callback) {
        var $helpPhraseTyper = $helpPhrase.find('.HelpPhrase__typer');
        var phrase = $helpPhraseTyper.data('phrase');
        var length = phrase.length;
        var count = length;
        var typer = setInterval(function() {
            if (count < 0) {
                clearInterval(typer);
                callback();
            }
            count = count - 1;
            $helpPhraseTyper.text(phrase.substring(0, count));
        }, 30);
    }

    function read(callback) {
        setTimeout(function() {
            callback();
        }, 2300);
    }

    function changeActive($helpPhrase) {
        var $next = $helpPhrase.next();
        if (!$next.length) {
            $next = $helpPhrase.siblings().first()
        }
        $helpPhrase.removeClass('active')
        $next.addClass('active');
    }
})