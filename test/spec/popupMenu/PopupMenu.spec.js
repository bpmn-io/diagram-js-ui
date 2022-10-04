import { render, cleanup, act } from '@testing-library/preact/pure';
import PopupMenu from 'src/popupMenu/PopupMenu';
import TestContainer from 'mocha-test-container-support';

import { insertCSS } from 'test/helper';

import testImage from 'assets/a.png';

import { query as domQuery, queryAll as domQueryAll } from 'min-dom';

import diagramCSS from 'assets/diagram-js-ui.css';


insertCSS('diagram-js-ui.css', diagramCSS);


describe('<PopupMenu>', function() {
  let container, parent;

  beforeEach(function() {
    parent = TestContainer.get(this);

    container = document.createElement('div');

    container.classList.add('djs-popup-parent');
    parent.appendChild(container);
  });

  afterEach(function() {
    cleanup();
  });


  it('should render', function() {
    createPopupMenu({ container });
  });


  it('should be visible even if no `position.cursor` was passed', function() {

    // when
    createPopupMenu({ container });

    // then
    expect(getComputedStyle(container).visibility).not.to.eql('hidden');

  });


  it('should open in correct position', function() {

    // given
    var position = () => {
      return { x: 100, y: 100 };
    };

    // when
    createPopupMenu({
      container,
      position
    });

    const popup = domQuery(
      '.overlay', container
    ).getBoundingClientRect();

    // then
    expect(popup.x).to.eql(100);
    expect(popup.y).to.eql(100);
  });


  describe('close', function() {

    it('should close on background click', function() {
      const onClose = sinon.spy();

      createPopupMenu({ container, onClose });

      container.children[0].click();

      expect(onClose).to.have.been.called;
    });


    it('should close on entry click', function() {
      const onClose = sinon.spy();

      const entries = [ { id: '1', label: 'Entry 1', action: ()=>{} } ];

      // when
      createPopupMenu({ container, entries, onClose });

      var entry = domQuery('.entry', container);

      // when
      entry.click();

      // then
      expect(onClose).to.have.been.called;
    });

  });


  describe('body', function() {

    it('should only render body if entries exist', function() {

      // when
      createPopupMenu({ container });

      // then
      expect(domQuery('.djs-popup-body', container)).not.to.exist;

    });


    it('should trigger action on click', function() {

      // given
      var actionListener = sinon.spy();

      const entries = [ { id: '1', label: 'Entry 1', action: actionListener } ];

      // when
      createPopupMenu({ container, entries });

      var entry = domQuery('.entry', container);

      // when
      entry.click();

      // then
      expect(actionListener).to.have.been.called;

    });


    it('should focus first entry', function() {
      const entries = [
        { id: '1', label: 'Entry 1' },
        { id: '2', label: 'Entry 2' }
      ];

      createPopupMenu({ container, entries });

      const firstEntry = domQuery('.entry', container);

      // then
      expect(firstEntry.classList.contains('selected')).to.be.true;

    });

  });


  describe('header', function() {

    it('should be attached to the top of the popup menu, if set', function() {

      // given
      const headerEntries = {
        '1': { label: 'Entry 1' }
      };

      // when
      createPopupMenu({ container, headerEntries });

      // then
      var popupHeader = domQuery('.djs-popup .header', container);
      expect(domQuery('.djs-popup .header-entry', popupHeader)).to.exist;

    });


    describe('entries', function() {

      it('should add standard class to entry', function() {

        // given
        const headerEntries = { '1': { title: 'Header Entry A' } };

        // when
        createPopupMenu({ container, headerEntries });

        var popupHeader = domQuery('.djs-popup .header', container);

        // then
        expect(
          domQueryAll('.djs-popup .header-entry', popupHeader).length
        ).to.eql(1);
      });


      it('should add custom class to entry if specified', function() {
        const headerEntries = { '2': { className: 'header-entry-1 cls2 cls3' } };

        // when
        createPopupMenu({ container, headerEntries });

        // then
        var element = domQuery('.header-entry-1', container);
        expect(element.className).to.eql(
          'header-entry header-entry-1 cls2 cls3'
        );
      });


      it('should have label if specified', function() {

        // given
        const headerEntries = {
          '2': { className: 'header-entry-1', label: 'Header 1' }
        };

        // when
        createPopupMenu({ container, headerEntries });

        // then
        var element = domQuery('.header-entry-1', container);
        expect(element.textContent).to.eql('Header 1');
      });


      it('should add action-id to entry', function() {

        // given
        const headerEntries = {
          save: { label: 'SAVE' },
          load: { label: 'LOAD' },
          undo: { label: 'UNDO' }
        };

        // when
        createPopupMenu({ container, headerEntries });

        // then
        var group = domQueryAll('.djs-popup .header-entry', container);

        var entry1 = group[0];
        var entry2 = group[1];
        var entry3 = group[2];

        expect(entry1.getAttribute('data-id')).to.eql('save');
        expect(entry2.getAttribute('data-id')).to.eql('load');
        expect(entry3.getAttribute('data-id')).to.eql('undo');
      });


      it('should add an image to the header section, if specified', function() {

        // given
        const headerEntries = {
          '1': { imageUrl: testImage, className: 'image-1' }
        };

        // when
        createPopupMenu({ container, headerEntries });

        // then
        var img = domQuery('.image-1 img', container);

        expect(img).to.exist;
        expect(img.getAttribute('src')).to.eql(testImage);
      });


      it('should NOT allow XSS via imageUrl', function() {

        // given
        const headerEntries = { '1': { imageUrl: '"><marquee />' } };

        // when
        createPopupMenu({ container, headerEntries });

        // then
        var injected = domQuery('marquee', container);
        expect(injected).not.to.exist;
      });


      it('should trigger action on click', function() {

        // given
        var actionListener = sinon.spy();

        const headerEntries = {
          '1': {
            label: 'foo',
            className: 'label-1',
            action: actionListener
          }
        };

        // when
        createPopupMenu({ container, headerEntries });

        var entry = domQuery('.header-entry', container);

        // when
        entry.click();

        // then
        expect(actionListener).to.have.been.called;
      });

    });

  });


  describe('search', function() {

    const entries = [
      { id: '1', label: 'Entry 1' },
      { id: '2', label: 'Entry 2' },
      { id: '3', label: 'Last' }
    ];

    it('should filter entries', async function() {

      // given
      createPopupMenu({ container, entries });

      var searchInput = domQuery('.djs-popup .search input', container);
      searchInput.value = 'Entry 1';

      // when
      searchInput.dispatchEvent(new Event('keydown'));
      searchInput.dispatchEvent(new Event('keyup'));

      await whenStable();

      // then
      expect(domQueryAll('.entry', container).length).to.eql(1);
      expect(domQuery('.entry', container).textContent).to.eql('Entry 1');
    });


    it('should allow partial search', async function() {

      // given
      createPopupMenu({ container, entries });

      var searchInput = domQuery('.djs-popup .search input', container);
      searchInput.value = 'Entry';

      // when
      searchInput.dispatchEvent(new Event('keydown'));
      searchInput.dispatchEvent(new Event('keyup'));

      await whenStable();

      // then
      expect(domQueryAll('.entry', container).length).to.eql(2);
    });

  });

  describe('keyboard', function() {
    const action = sinon.spy();

    const entries = [
      { id: '1', label: 'Entry 1', action },
      { id: '2', label: 'Entry 2' },
      { id: '3', label: 'Entry 3' }
    ];

    it('should trigger entry with <Enter>', async function() {

      // given
      createPopupMenu({ container, entries });

      const searchInput = domQuery('.djs-popup .search input', container);

      // when
      searchInput.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Enter' }));

      // then
      expect(action).to.be.called;

    });


    it('should close with <Escape>', function() {

      // given
      const onClose = sinon.spy();
      createPopupMenu({ container, entries, onClose });

      const searchInput = domQuery('.djs-popup .search input', container);

      // when
      searchInput.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Escape' }));

      // then
      expect(onClose).to.be.called;

    });


    it('should navigate with <ArrowUp>', async function() {

      // given
      createPopupMenu({ container, entries });

      const searchInput = domQuery('.djs-popup .search input', container);

      expect(domQuery('.selected', container).textContent).to.eql('Entry 1');

      // when
      searchInput.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowDown' }));
      await whenStable();

      // then
      expect(domQuery('.selected', container).textContent).to.eql('Entry 2');

    });


    it('should navigate with <ArrowUp>', async function() {

      // given
      createPopupMenu({ container, entries });

      const searchInput = domQuery('.djs-popup .search input', container);

      expect(domQuery('.selected', container).textContent).to.eql('Entry 1');

      // when
      searchInput.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'ArrowUp' }));
      await whenStable();

      // then
      expect(domQuery('.selected', container).textContent).to.eql('Entry 3');

    });

  });
});

// helpers
function createPopupMenu(options) {
  const { container } = options;

  const position = () => {
    return { x: 0, y: 0 };
  };

  return render(
    <PopupMenu
      entries={ [] }
      headerEntries={ [] }
      onClose={ () => {} }
      position={ position }
      { ...options }
    />,
    {
      container
    }
  );
}

const whenStable = async () =>
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 130));
  });
